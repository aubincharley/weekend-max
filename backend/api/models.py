from django.db import models

# Create your models here.

class Logs(models.Model):
    clicked_at = models.DateTimeField(auto_now_add=True)
    leaving_city = models.CharField(max_length=100)
    destination_city = models.CharField(max_length=100,blank=True)
    trip_length = models.CharField(max_length=100,blank=True)

    def __str__(self):
        return f"Log {self.id} - {self.leaving_city} to {self.destination_city} ({self.trip_length} days)"
    


    