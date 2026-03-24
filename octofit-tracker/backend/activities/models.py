from django.db import models

from django.contrib.auth.models import User

class Activity(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	activity_type = models.CharField(max_length=100)
	duration_minutes = models.PositiveIntegerField()
	calories_burned = models.PositiveIntegerField()
	date = models.DateField(auto_now_add=True)

	def __str__(self):
		return f"{self.user.username} - {self.activity_type} ({self.date})"
