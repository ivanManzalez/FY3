class MissingFieldError(Exception):
  pass

def check_user_field(data):
  fields = [
    data.get('username'),
    data.get('password'),
    data.get('email'),
    data.get('first_name'),
    data.get('last_name'),   
  ]

  for field in fields:
    print(field)
    if field == "" or field == None:
      raise MissingFieldError("1 or more Missing fields: username, password, email, first_name, or last_name")
  
  return fields
  
def check_userjoinplayer_field(data):
  fields = [
    data.get('firebase_id'),
    data.get('player_id'),
    data.get('user'),
  ]

  for field in [fields[0], fields[2]]:

    print("Checking:",field)
    if field == "" or field == None:
      raise MissingFieldError("1 or more Missing fields: username, password, email, first_name, or last_name")
  
  return fields
  