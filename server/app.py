from flask import Flask, make_response, request, jsonify
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import *


app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"

migrate=Migrate(app, db)
db.init_app(app)

api=Api(app)


class UserResource(Resource):
    def get(self, id=None):
        if id:
            user = User.query.get(id)
            if not user:
                return make_response({"message": "User not found"}, 404)
            return make_response(user.to_dict(), 200)
        
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)

    def post(self):
        data = request.get_json()
        new_user = User(username=data["username"], email=data["email"])
        db.session.add(new_user)
        db.session.commit()
        return make_response({"message": "User created successfully"}, 201)

    def delete(self, id):
        user = User.query.get(id)
        if not user:
            return make_response({"message": "User not found"}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response({"message": "User successfully deleted"}, 200)

    def patch(self, id):
        user = User.query.get(id)
        if not user:
            return make_response({"message": "User not found"}, 404)
        
        data = request.get_json()
        for key, value in data.items():
            setattr(user, key, value)
        
        db.session.commit()
        return make_response(user.to_dict(), 200)


class ProductResource(Resource):
    def get(self, id=None):
        if id:
            product = Product.query.get(id)
            if not product:
                return make_response({"message": "Product not found"}, 404)
            return make_response(product.to_dict(), 200)
        
        products = [product.to_dict() for product in Product.query.all()]
        return make_response(jsonify(products), 200)

    def post(self):
        data = request.get_json()
        new_product = Product(
            title=data['title'],
            description=data['description'],
            price=data['price'],
            category=data.get('category'),
            image_url=data.get('image_url')
        )
        db.session.add(new_product)
        db.session.commit()
        return make_response({"message": "Product created successfully"}, 201)

    def delete(self, id):
        product = Product.query.get(id)
        if not product:
            return make_response({"message": "Product not found"}, 404)
        db.session.delete(product)
        db.session.commit()
        return make_response({"message": "Product successfully deleted"}, 200)

    def patch(self, id):
        product = Product.query.get(id)
        if not product:
            return make_response({"message": "Product not found"}, 404)
        
        data = request.get_json()
        for key, value in data.items():
            setattr(product, key, value)
        
        db.session.commit()
        return make_response(product.to_dict(), 200)

class OrderResource(Resource):
    def get(self, id=None):
        if id:
            order = Order.query.get(id)
            if not order:
                return make_response({"message": "Order not found"}, 404)
            return make_response(order.to_dict(), 200)
        
        orders = [order.to_dict() for order in Order.query.all()]
        return make_response(jsonify(orders), 200)

    def post(self):
        data = request.get_json()
        user = User.query.get(data['user_id'])
        if not user:
            return make_response({"message": "User not found"}, 404)
        
        products = Product.query.filter(Product.id.in_(data['product_ids'])).all()
        if not products:
            return make_response({"message": "Invalid product IDs"}, 400)
        
        total_price = sum([product.price for product in products])
        new_order = Order(
            user_id=user.id,
            total_price=total_price
        )
        new_order.products.extend(products)
        db.session.add(new_order)
        db.session.commit()
        return make_response({"message": "Order created successfully"}, 201)

    def delete(self, id):
        order = Order.query.get(id)
        if not order:
            return make_response({"message": "Order not found"}, 404)
        db.session.delete(order)
        db.session.commit()
        return make_response({"message": "Order successfully deleted"}, 200)


# Add RESTful resource for User
api.add_resource(UserResource, '/users', '/users/<int:id>')
api.add_resource(ProductResource, '/products', '/products/<int:id>')
api.add_resource(OrderResource, '/orders', '/orders/<int:id>')


@app.route("/")
def index():
    return "Welcome to flask"

if __name__=='__main__':
    app.run(port=5500, debug=True)