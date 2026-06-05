from sqlalchemy import Column, Integer, String, Float, Boolean
from database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    category = Column(String)
    image_url = Column(String, default="")
    stock = Column(Integer, default=10)
    featured = Column(Boolean, default=False)
