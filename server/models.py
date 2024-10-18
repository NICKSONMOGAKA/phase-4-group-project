from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
import re
from werkzeug.security import generate_password_hash


db = SQLAlchemy()

order_product = db.Table('order_product',
    db.Column('order_id', db.Integer, db.ForeignKey('orders.id'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True)
)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  
    

    orders = db.relationship('Order', back_populates='user')

    @validates('email')
    def validate_email(self, key, email):
        email_pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not re.match(email_pattern, email):
            raise ValueError("Invalid email format")
        return email

    @validates('password')
    def validate_password(self, key, password):
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long")
        return generate_password_hash(password)

    @validates('full_name')
    def validate_full_name(self, key, full_name):
        if not full_name or full_name.strip() == "":
            raise ValueError("Full name cannot be empty")
        return full_name

    def __repr__(self):
        return f'<User {self.full_name}>'



class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50))
    image_url = db.Column(db.String(255))
    

    orders = db.relationship('Order', secondary=order_product, back_populates='products')


    @validates('title')
    def validate_title(self, key, title):
        if not title or title.strip() == "":
            raise ValueError("Product title cannot be empty")
        return title

    @validates('description')
    def validate_description(self, key, description):
        if not description or description.strip() == "":
            raise ValueError("Product description cannot be empty")
        return description

    @validates('price')
    def validate_price(self, key, price):
        if price <= 0:
            raise ValueError("Price must be greater than zero")
        return price


    @validates('category')
    def validate_category(self, key, category):
        if category and category.strip() == "":
            raise ValueError("Category cannot be empty")
        return category

    def __repr__(self):
        return f'<Product {self.title}>'



class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)
    products = db.relationship('Product', secondary=order_product, back_populates='orders')
    total_price = db.Column(db.Float, nullable=False)


    @validates('user_id')
    def validate_user_id(self, key, user_id):
        user = User.query.get(user_id)
        if not user:
            raise ValueError("Invalid user_id: User does not exist")
        return user_id

    @validates('total_price')
    def validate_total_price(self, key, total_price):
        if total_price <= 0:
            raise ValueError("Total price must be greater than zero")
        return total_price



    def __repr__(self):
        return f'<Order {self.id} - User: {self.user_id}>'