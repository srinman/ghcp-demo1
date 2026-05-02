from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uuid

app = FastAPI(title="Items API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store
items: dict[str, dict] = {}


class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float


class ItemResponse(Item):
    id: str


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/items", response_model=list[ItemResponse])
def list_items():
    return list(items.values())


@app.get("/api/items/{item_id}", response_model=ItemResponse)
def get_item(item_id: str):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]


@app.post("/api/items", response_model=ItemResponse, status_code=201)
def create_item(item: Item):
    item_id = str(uuid.uuid4())
    record = {"id": item_id, **item.model_dump()}
    items[item_id] = record
    return record


@app.delete("/api/items/{item_id}", status_code=204)
def delete_item(item_id: str):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    del items[item_id]
