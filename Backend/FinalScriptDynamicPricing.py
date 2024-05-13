import csv
from datetime import datetime, timedelta
import random

# Function to calculate price based on deadline and number of pages
def calculate_price(service, deadline, no_of_pages):
    # base_prices = {
    #     "PPT": {"deadline": 5, "price": 200, "pages": 10},
    #     "Docs": {"deadline": 3, "price": 100, "pages": 8},
    #     "Website": {"deadline": 7, "price": 1500, "pages": 5},
    #     "App": {"deadline": 10, "price": 2000, "pages": 3},
    # }

    base_prices = {
    "App": {"deadline": 30, "pages": 4, "price": 2000},
    "Website": {"deadline":25, "pages": 5, "price": 1500},
    "Frontend": {"deadline":20, "pages": 5, "price": 1400},
    "Backend": {"deadline":20, "pages": 5, "price": 1200},
    "Figma": {"deadline":15, "pages": 7, "price": 700},
    "PPT": {"deadline":10, "pages": 10, "price": 400},
    "Docs": {"deadline":7, "pages": 12, "price": 200}
}

    price_range = {
        "PPT": (200, 800),
        "Docs": (100, 500),
        "Website": (1500, 3500),
        "App": (2000, 5000),
        "Frontend": (1400, 3000),
        "Backend": (1200, 3000),
        "Figma": (700, 2000),

    }

    base_price = base_prices[service]["price"]
    base_deadline = base_prices[service]["deadline"]
    base_pages = base_prices[service]["pages"]

    if deadline < base_deadline:
        price_increase_due_to_deadline = (base_deadline - deadline) * 50  # Increase by Rs.50 for each shorter day
        base_price += price_increase_due_to_deadline

    if no_of_pages is not None:
        base_pages = no_of_pages if base_pages is None else base_pages
        if no_of_pages > base_pages:
            price_increase_due_to_pages = (no_of_pages - base_pages) * 25  # Increase by Rs.25 for each additional page
            base_price += price_increase_due_to_pages

    # Apply price range limits
    base_price = max(min(base_price, price_range[service][1]), price_range[service][0])

    return base_price

# Function to generate a random date within a given range
def random_date(start_date, end_date):
    return start_date + timedelta(days=random.randint(0, (end_date - start_date).days))

# Generate synthetic dataset with updated pricing
def generate_dataset(num_records):
    usernames = [f"user{i}" for i in range(1, num_records + 1)]
    service_providers = [f"provider{i}" for i in range(1, num_records + 1)]
    services = ["PPT", "Docs", "Website", "App", "Frontend", "Backend", "Figma"]
    topics = [f"Topic{i}" for i in range(1, num_records + 1)]

    today = datetime.today()
    end_date = today + timedelta(days=30)  # Dataset spans 30 days

    with open("dataset2marchnew.csv", mode="w", newline="") as csv_file:
        fieldnames = ["username", "service_provider_username", "service", "price", "no_of_pages", "topic", "date", "deadline"]
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        writer.writeheader()

        for i in range(num_records):
            service = random.choice(services)
            deadline = random.randint(1, 15)  # Random deadline between 1 and 15 days

            # Set page size between 3 and 7 for App and Website
            if service == "Website" or service == "App":
                no_of_pages = random.randint(3, 7)
            else:
                no_of_pages = random.randint(1, 20)  # Random pages for PPT and Docs

            date = random_date(today, end_date)
            price = calculate_price(service, deadline, no_of_pages)

            writer.writerow({
                "username": usernames[i],
                "service_provider_username": service_providers[i],
                "service": service,
                "price": price,
                "no_of_pages": no_of_pages,
                "topic": topics[i],
                "date": date.strftime("%Y-%m-%d"),
                "deadline": (date + timedelta(days=deadline)).strftime("%Y-%m-%d")
            })

# Generate 10 records for demonstration
generate_dataset(10000)
print("Dataset generated successfully.")
