from pydantic import BaseModel
from typing import Optional


class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image_url: str = ""
    stock: int = 10
    featured: bool = False


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    stock: Optional[int] = None
    featured: Optional[bool] = None


class Product(ProductBase):
    id: int

    model_config = {"from_attributes": True}
