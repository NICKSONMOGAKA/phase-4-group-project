from flask import Flask, make_response, request, jsonify
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import *
from flask_cors import CORS

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

migrate=Migrate(app, db)
db.init_app(app)
api=Api(app)
jwt = JWTManager(app)

class LoginResource(Resource):
    def post(self):
        try:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')
            
            user = User.query.filter_by(email=email).first()
            if not user or not check_password_hash(user.password, password):
                return make_response({"message": "Invalid email or password"}, 401)
            
            access_token = create_access_token(identity=user.id)
            return make_response({"access_token": access_token}, 200)
        except Exception as e:
            print(f"Error during login: {str(e)}")
            return make_response({"message": "Internal server error"}, 500)


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
        full_name = data.get("full_name")
        email = data.get("email")
        password = data.get("password")
        
        # Check if the email is already registered
        if User.query.filter_by(email=email).first():
            return make_response({"message": "Email already exists"}, 400)
        
        new_user = User(full_name=full_name, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        return make_response({"message": "User created successfully"}, 201)

    @jwt_required()
    def delete(self, id):
        user = User.query.get(id)
        if not user:
            return make_response({"message": "User not found"}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response({"message": "User successfully deleted"}, 200)

    @jwt_required()
    def patch(self, id):
        user = User.query.get(id)
        if not user:
            return make_response({"message": "User not found"}, 404)
        
        data = request.get_json()
        for key, value in data.items():
            setattr(user, key, value)
        
        db.session.commit()
        return make_response(user.to_dict(), 200)

# Add JWT authentication for products and orders if needed
class ProductResource(Resource):
    def get(self, id=None):
        if id:
            product = Product.query.get(id)
            if not product:
                return make_response({"message": "Product not found"}, 404)
            return make_response(product.to_dict(), 200)
        
        products = [product.to_dict() for product in Product.query.all()]
        return make_response(jsonify(products), 200)

    @jwt_required()
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

    @jwt_required()
    def delete(self, id):
        product = Product.query.get(id)
        if not product:
            return make_response({"message": "Product not found"}, 404)
        db.session.delete(product)
        db.session.commit()
        return make_response({"message": "Product successfully deleted"}, 200)

    @jwt_required()
    def patch(self, id):
        product = Product.query.get(id)
        if not product:
            return make_response({"message": "Product not found"}, 404)
        
        data = request.get_json()
        for key, value in data.items():
            setattr(product, key, value)
        
        db.session.commit()
        return make_response(product.to_dict(), 200)

# Resource for handling orders
class OrderResource(Resource):
    @jwt_required()
    def get(self, id=None):
        if id:
            order = Order.query.get(id)
            if not order:
                return make_response({"message": "Order not found"}, 404)
            return make_response(order.to_dict(), 200)
        
        orders = [order.to_dict() for order in Order.query.all()]
        return make_response(jsonify(orders), 200)

    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
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

    @jwt_required()
    def delete(self, id):
        order = Order.query.get(id)
        if not order:
            return make_response({"message": "Order not found"}, 404)
        db.session.delete(order)
        db.session.commit()
        return make_response({"message": "Order successfully deleted"}, 200)



api.add_resource(LoginResource, '/auth/login')
api.add_resource(UserResource, '/users', '/users/<int:id>')
api.add_resource(ProductResource, '/products', '/products/<int:id>')
api.add_resource(OrderResource, '/orders', '/orders/<int:id>')

@app.route("/")
def index():
    return "Welcome to flask"

if __name__=='__main__':
    app.run(port=5500, debug=True)