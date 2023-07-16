from django.db import models

class Role(models.Model):
  '''
  The Role entries are managed by the system,
  automatically created via a Django data migration.
  '''
  COMMISSIONER = 1
  GENERAL_MANAGER = 2
  PLAYER = 3
  SPECTATOR = 4
  ROLE_CHOICES = (
      (COMMISSIONER, 'commissioner'),
      (GENERAL_MANAGER, 'general manager'),
      (PLAYER, 'player'),
      (SPECTATOR, 'spectator'),
  )

  id = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, primary_key=True)

  def __str__(self):
      return self.get_id_display()


class User(AbstractUser):
  roles = models.ManyToManyField(Role)
  facebook = models.CharField(max_length = 255, default= '')
  instagram = models.CharField(max_length = 255, default= '')
