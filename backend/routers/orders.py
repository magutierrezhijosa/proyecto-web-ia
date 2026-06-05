from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Order, Product, User
from schemas import OrderCreate, OrderResponse
from routers.auth import get_current_user

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.get("/", response_model=list[OrderResponse])
def list_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Obtener historial de compras del usuario logueado."""
    return (
        db.query(Order)
        .filter(Order.user_id == current_user.id)
        .order_by(Order.created_at.desc())
        .all()
    )


@router.post("/", response_model=OrderResponse, status_code=201)
def create_order(
    order_data: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Crear una orden desde el carrito."""
    # Validar stock
    for item in order_data.items:
        product = db.query(Product).filter(Product.id == item.id).first()
        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Producto '{item.name}' no encontrado",
            )
        if product.stock < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Stock insuficiente para '{product.name}'. Disponible: {product.stock}",
            )

    # Descontar stock
    for item in order_data.items:
        product = db.query(Product).filter(Product.id == item.id).first()
        product.stock -= item.quantity

    # Crear orden
    order = Order(
        user_id=current_user.id,
        items=[item.model_dump() for item in order_data.items],
        total=order_data.total,
        status="completado",
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order
