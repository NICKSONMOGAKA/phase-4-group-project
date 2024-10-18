import os
from datetime import datetime
from models import db, User, Product, Order, order_product
from app import app

with app.app_context():
    # Drop and recreate all tables
    db.drop_all()
    db.create_all()

    # Seed Users
    user1 = User(
        full_name="Alice Johnson",
        email="alice@example.com",
        password="password123"  
    )
    user2 = User(
        full_name="Bob Smith",
        email="bob@example.com",
        password="securepassword"  
    )

    # Add users to the session
    db.session.add_all([user1, user2])
    db.session.commit()

    # Seed Products
    product1 = Product(
        title="Wireless Mouse",
        description="A comfortable wireless mouse with ergonomic design.",
        price=25.99,
        category="Electronics",
        image_url="https://media.istockphoto.com/id/1002544882/photo/a-white-computer-mouse-on-white-background-top-view-flat-lay-minimal-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=ItYKb4UBZjLHEVXzGDrcJ5h0hqCGlqnkqEcuwZBsUDA="
    )
    product2 = Product(
        title="Bluetooth Headphones",
        description="High-quality noise-canceling headphones with long battery life.",
        price=79.99,
        category="Electronics",
        image_url="https://media.istockphoto.com/id/1246138278/photo/silver-metallic-white-wireless-headphones-in-the-air-isolated-on-white-background-music.webp?a=1&b=1&s=612x612&w=0&k=20&c=yaQ6l4WHU8cHGcfbybzI2z-k4OSnAj3WYjmbZrK1fcQ="
    )
    product3 = Product(
        title="Organic Green Tea",
        description="A pack of 100 organic green tea bags for a refreshing experience.",
        price=15.99,
        category="Groceries",
        image_url="https://media.istockphoto.com/id/1489867290/photo/many-tea-bags-in-wooden-box-and-leaves-on-light-green-background-closeup.webp?a=1&b=1&s=612x612&w=0&k=20&c=VhL4FN-wFuTwtFQOz2KFlhpPl3K3MMijXTb9kr-FXIg="
    )

    # Add products to the session
    db.session.add_all([product1, product2, product3])
    db.session.commit()

    # Seed Orders
    order1 = Order(
        user_id=user1.id,
        order_date=datetime.utcnow(),
        total_price=product1.price + product2.price
    )
    order1.products.append(product1)
    order1.products.append(product2)

    order2 = Order(
        user_id=user2.id,
        order_date=datetime.utcnow(),
        total_price=product3.price * 2 
    )
    order2.products.append(product3)
    order2.products.append(product2)  

    # Add orders to the session
    db.session.add_all([order1, order2])
    db.session.commit()

    print("Database seeded successfully.")
