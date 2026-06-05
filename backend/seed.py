"""
Carga datos de prueba de presas de escalada en la base de datos.
Ejecutar: python seed.py
"""

from database import engine, SessionLocal, Base
from models import Product

# Lista de presas de escalada para testear
PRESAS = [
    {
        "name": "Sloper XL - Agarre Redondo",
        "description": "Sloper grande de 15cm de diámetro. Ideal para trabajar fuerza de apertura y mejorar el agarre en regletas grandes. Fabricado en resina de poliuretano de alta resistencia.",
        "price": 18.50,
        "category": "Slopers",
        "image_url": "",
        "stock": 25,
        "featured": True,
    },
    {
        "name": "Regleta Filo - 8mm",
        "description": "Regleta de precisión de solo 8mm de canto. Para niveles avanzados que quieran mejorar la fuerza en los dedos. Resina antideslizante con textura rugosa.",
        "price": 9.90,
        "category": "Regletas",
        "image_url": "",
        "stock": 40,
        "featured": True,
    },
    {
        "name": "Canto Jug - Presa Grande",
        "description": "Presa tipo jug (canto grande) de 20cm. Perfecta para principiantes y vías de calentamiento. Agarre cómodo y profundo con dos manos.",
        "price": 14.00,
        "category": "Jugs",
        "image_url": "",
        "stock": 30,
        "featured": True,
    },
    {
        "name": "Pinza Volumen - 30°",
        "description": "Presa de pinza con inclinación de 30 grados. Trabaja la fuerza de compresión de la mano. Ideal para entrenamiento de bloque.",
        "price": 12.00,
        "category": "Pinzas",
        "image_url": "",
        "stock": 20,
        "featured": False,
    },
    {
        "name": "Agujero Two-Fingers",
        "description": "Agujero para dos dedos (índice y medio). Profundidad de 3cm con borde redondeado. Entrenamiento específico para dedos en rutas de placa.",
        "price": 8.50,
        "category": "Agujeros",
        "image_url": "",
        "stock": 35,
        "featured": False,
    },
    {
        "name": "Volumen Triangular 40cm",
        "description": "Volumen geométrico triangular de 40cm. Para crear rutas tridimensionales y movimientos de piernas. Incluye tornillos de fijación.",
        "price": 32.00,
        "category": "Volúmenes",
        "image_url": "",
        "stock": 10,
        "featured": True,
    },
    {
        "name": "Sloper Blando - Inclinación Negativa",
        "description": "Sloper con inclinación negativa de 45 grados. Resina con agarre extra suave para trabajar la técnica de apertura. Diámetro 12cm.",
        "price": 15.50,
        "category": "Slopers",
        "image_url": "",
        "stock": 18,
        "featured": False,
    },
    {
        "name": "Regleta Media - 12mm",
        "description": "Regleta de grosor medio (12mm). El punto dulce entre las regletas finas y los cantos grandes. Ideal para progresión de principiante a intermedio.",
        "price": 7.50,
        "category": "Regletas",
        "image_url": "",
        "stock": 45,
        "featured": False,
    },
    {
        "name": "Crimp Pequeño - 6mm",
        "description": "Regleta minúscula de 6mm. Solo para escaladores avanzados. Entrenamiento de fuerza máxima en dedos. Borde ligeramente redondeado.",
        "price": 11.00,
        "category": "Regletas",
        "image_url": "",
        "stock": 25,
        "featured": True,
    },
    {
        "name": "Presa de Pared - Presón Grande",
        "description": "Presón grande multi-agarre con 4 agarres diferentes en una sola pieza. 25cm de largo. Ideal para rocódromos y entrenamiento en casa.",
        "price": 24.00,
        "category": "Jugs",
        "image_url": "",
        "stock": 15,
        "featured": True,
    },
    {
        "name": "Pinza Asimétrica",
        "description": "Pinza con forma asimétrica que obliga a trabajar el equilibrio y la colocación del cuerpo. Un lado cóncavo y el otro convexo.",
        "price": 13.50,
        "category": "Pinzas",
        "image_url": "",
        "stock": 22,
        "featured": False,
    },
    {
        "name": "Agujero Monodedo",
        "description": "Agujero para un solo dedo. El ejercicio más intenso para la fuerza de los dedos. Profundidad 2.5cm con borde biselado.",
        "price": 10.00,
        "category": "Agujeros",
        "image_url": "",
        "stock": 30,
        "featured": False,
    },
    {
        "name": "Volumen Redondo 30cm",
        "description": "Volumen semiesférico de 30cm de diámetro. Para creaciones de rutas creativas con movimientos de coordinación. Resina liviana.",
        "price": 28.00,
        "category": "Volúmenes",
        "image_url": "",
        "stock": 8,
        "featured": True,
    },
    {
        "name": "Sloper Mini - 6cm",
        "description": "Sloper pequeño de 6cm. Perfecto para entrenamiento de precisión y fuerza de apertura en espacios reducidos.",
        "price": 11.50,
        "category": "Slopers",
        "image_url": "",
        "stock": 28,
        "featured": False,
    },
    {
        "name": "Canto Bicolor - Presa Decorativa",
        "description": "Presa tipo jug bicolor con diseño moderno. Cómoda y estética. Hecha con resina teñida en masa, colores vibrantes que no se desgastan.",
        "price": 16.00,
        "category": "Jugs",
        "image_url": "",
        "stock": 20,
        "featured": False,
    },
]


def seed_database():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    # Solo seed si la tabla está vacía
    existing = db.query(Product).count()
    if existing > 0:
        print(f"La base ya tiene {existing} productos. Omitiendo seed.")
        db.close()
        return

    for presa_data in PRESAS:
        product = Product(**presa_data)
        db.add(product)

    db.commit()
    db.close()
    print(f"[OK] {len(PRESAS)} presas de escalada cargadas correctamente.")


if __name__ == "__main__":
    seed_database()
