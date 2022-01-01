import time
from locust import HttpUser, task, between

class cmplrStress(HttpUser):
    wait_time = between(1,3)

    @task
    def home_page(self):
        self.client.get(url="/")

   


#locust -f locust.py --host https://beta.cmplr.tech