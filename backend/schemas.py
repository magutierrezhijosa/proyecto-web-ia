from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# === Productos ===

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


# === Usuarios ===

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    full_name: str = ""
    phone: str = ""


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    phone: str
    address: str
    created_at: datetime

    model_config = {"from_attributes": True}


# === Autenticación ===

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: str
    password: str


# === Órdenes ===

class OrderItem(BaseModel):
    id: int
    name: str
    price: float
    quantity: int
    image_url: str = ""


class OrderCreate(BaseModel):
    items: list[OrderItem]
    total: float


class OrderResponse(BaseModel):
    id: int
    user_id: int
    items: list
    total: float
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
