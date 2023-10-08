from django.shortcuts import render
from rest_framework import generics, status
from django.views.decorators.csrf import csrf_protect#,csrf_exempt 
from django.utils.decorators import method_decorator

from rest_framework.views import APIView
from rest_framework.response import Response #send custom response from view

from .serializers import EventSerializer, CreateEventSerializer

from .models.event import Event

class EventsView(generics.ListAPIView): ## generics.CreateAPIView/ListAPIView
  print('Events View')
  queryset = Event.objects.all()
  serializer_class = EventSerializer

# @method_decorator(csrf_protect, name='dispatch')
class CreateEventView(APIView): ## CreateAPIView
  print('Create Events View')
  
  serializer_class = CreateEventSerializer

  def post(self, request, format=None):
    print('Create Events View - Post')
    #get access to session ID
    if not self.request.session.exists(self.request.session.session_key):
      #create session
      self.request.session.create()

    serializer = self.serializer_class(data=request.data)
    print('Create Events View - Post - serializer')
    if (not serializer.is_valid()): 
      resp_status = status.HTTP_406_NOT_ACCEPTABLE
      message = 'Invalid request'
      print('Create Events View - Post - not valid')
      return Response({'message':message, 'status': resp_status})

    date = serializer.data.get('date')
    start_time = serializer.data.get('start_time')
    end_time = serializer.data.get('end_time')

    queryset = Event.objects.filter(date=date, start_time=start_time) 
    qs_len = len(queryset)

    if (queryset.exists() and qs_len > 2):
      message = 'Conflict: There are already events at this time'
      resp_status = status.HTTP_409_CONFLICT
      print('Create Events View - Post - exists')
      return Response({'message': message, 'status':resp_status})

    name = serializer.data.get('name')
    street_number = serializer.data.get('street_number')
    street_name = serializer.data.get('street_name')
    city = serializer.data.get('city')

    try:
      print('Create Events View - Post - create')
      event = Event(
                name = name,
                date = date,
                start_time = start_time,
                end_time = end_time, 
                street_number = street_number,
                street_name = street_name,
                city = city)
      event.save()
      message = "New event created"
      resp_status=status.HTTP_200_OK
      print('Create Events View - Post - create - complete')

    except Exception as exp:
      message = exp
      print("Exception: ", exp)
      event = None
      resp_status = status.HTTP_500_INTERNAL_SERVER_ERROR

    response_data = {
        'message': message,
        'event': EventSerializer(event).data,
        'status' : resp_status,
    }
    return Response(response_data)

  class EventView(APIView):
    def get_object(self, event_id):
      try:
        return Event.objects.get(event_id=event_id)
      except Event.DoesNotExist:
        message = "Event # "+event_id+" does not exist"
        resp_status = status.HTTP_404_NOT_FOUND

        return Response({'message':message, 'status':resp_status})

    def get(self, request, event_id, format=None):
        event = self.get_object(event_id)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def put(self, request, event_id, format=None):
        event = self.get_object(event_id)
        serializer = EventSerializer(event_id, data=request.data)
        if serializer.is_valid():
            serializer.save()
            resp_status = status.HTTP_200_OK
            message = event + " updated"
            return Response({'event':serializer.data, 'message':message, 'status':resp_status}, status=resp_status)
        
        resp_status = status.HTTP_400_BAD_REQUEST
        message = serializer.errors
        print('Errors! => ', message)
        return Response({'message':message, 'status':resp_status}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, event_id, format=None):
        event = self.get_object(event_id)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)







# 