from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Logs
from .serializers import LogsSerializer

class LogsViewSet(viewsets.ModelViewSet):
    queryset = Logs.objects.all()
    serializer_class = LogsSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        print("Received data:", data)  # Log the incoming data for debugging

        # Extraire les données avec des valeurs par défaut appropriées
        leaving_city = data.get('leaving_city')
        destination_city = data.get('destination_city', '')
        trip_length = data.get('trip_length', '')

        print(f"Parsed data - Leaving City: {leaving_city}, Destination City: {destination_city}, Trip Length: {trip_length}")

        # Validation : leaving_city est requis
        if not leaving_city:
            return Response(
                {"error": "leaving_city (city) is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Préparer les données pour le serializer
            log_data = {
                'leaving_city': leaving_city,
                'destination_city': destination_city,
                'trip_length': trip_length
            }

            # Utiliser le serializer pour créer l'objet
            serializer = self.get_serializer(data=log_data)
            if serializer.is_valid():
                log = serializer.save()
                print(f"Created log entry: {log}")  # Confirm log creation
                return Response(
                    {"message": "Log entry created successfully", "id": log.id}, 
                    status=status.HTTP_201_CREATED
                )
            else:
                return Response(
                    {"error": "Invalid data", "details": serializer.errors}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

        except Exception as e:
            print(f"Error creating log: {str(e)}")
            return Response(
                {"error": f"Failed to create log entry: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )