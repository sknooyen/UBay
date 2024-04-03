from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo.database import Database
from pymongo.collection import Collection
from dotenv import load_dotenv
from urllib.parse import quote_plus
import os

load_dotenv()
user = quote_plus(os.environ["USER"])
password = quote_plus(os.environ["PASSWORD"])

# Replace the placeholder with your Atlas connection string
uri = f"mongodb+srv://{user}:{password}@database.h8igxx7.mongodb.net/?retryWrites=true&w=majority&appName=Database"

# Set the Stable API version when creating a new client
client = MongoClient(uri, server_api=ServerApi('1'))
                          
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

def get_collection(db: str, collection: str):
    """
    Navigates from the MongoDB client to the specified collection
    db: Database name
    collection: Collection name

    Returns Collection object
    """
    return client[db][collection]

def print_items(collection: Collection):
    """
    Prints out all documents stored within the given collection

    :Parameters:
    - collection: Collection object to get data from
    """
    print("########")
    print("Current Listings:")
    items = collection.find()
    for i in items:
        print(i)
    print("########")

def add_item(collection: Collection, item: dict):
    """
    Adds an item to the collection
    """
    res = collection.insert_one(item)
    print("Item added: ", res)

def delete_item(collection: Collection, filter: dict):
    """
    Deletes an item from the collection based on the filter given
    """
    res = collection.delete_one(filter)
    print("Item deleted: ", res)


if __name__ == "__main__":
    item = {
        "name": "pineapple",
        "price": 999,
        "condition": "fresh"
    }
    item2 = {
        "name": "pen",
        "price": 1,
        "condition": "used"
    }
    collection = get_collection("Listings", "Collection")
    print_items(collection)
    add_item(collection, item)
    add_item(collection, item2)
    print_items(collection)
    input("Press to continue")
    delete_item(collection, item)
    print_items(collection)
