import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By

BASE_URL = "https://safehavenconnect.me/"

@pytest.fixture
def driver() :
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(5)
    yield driver
    driver.quit()

def test_title(driver):
    driver.get(BASE_URL)
    assert "SafeHavenConnect" in driver.title

def test_nav_to_resources(driver):
    driver.get(BASE_URL)
    driver.find_element(By.LINK_TEXT, "Resources").click()
    assert "/resources" in driver.current_url

def test_nav_to_organizations(driver):
    driver.get(BASE_URL)
    driver.find_element(By.LINK_TEXT, "Organizations").click()
    assert "/organizations" in driver.current_url

def test_nav_to_events(driver):
    driver.get(BASE_URL)
    driver.find_element(By.LINK_TEXT, "Events").click()
    assert "/events" in driver.current_url

# Test if resource page loads and displays resource cards
def test_resource_page_loads(driver):
    driver.get(BASE_URL + "resources")
    cards = driver.find_elements(By.CLASS_NAME, "card")
    assert len(cards) > 0

# Test if events page loads and displays event cards
def test_events_page_loads(driver):
    driver.get(BASE_URL + "events")
    cards = driver.find_elements(By.CLASS_NAME, "card")
    assert len(cards) > 0

# Test if organizations page loads and displays organization cards
def test_orgs_page_loads(driver):
    driver.get(BASE_URL + "organizations")
    cards = driver.find_elements(By.CLASS_NAME, "card")
    assert len(cards) > 0

# Test if clicking a resource card link navigates to its detail page
def test_click_resource_card_link(driver):
    driver.get(BASE_URL + "resources")
    first_link = driver.find_element(By.CSS_SELECTOR, "a[href*='/resource']")
    href = first_link.get_attribute("href")
    first_link.click()
    assert href in driver.current_url

# Test if the About page contains expected content
def test_about_page_content(driver):
    driver.get(BASE_URL + "about")
    body_text = driver.find_element(By.TAG_NAME, "body").text
    assert "SafeHavenConnect" in body_text
    assert "help individuals" in body_text.lower()

# Test the navbar
# def test_navbar(driver):
#     pages = ["", "resources", "events", "organizations", "about", "visualizations", "provider visualizations"]
#     for page in pages:
#         driver.get(BASE_URL + page)
#         navbar = driver.find_element(By.TAG_NAME, "nav")
#         assert navbar.is_displayed(), f"Navbar missing on /{page}"


