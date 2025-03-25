from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import pandas as pd
import json
import logging

# Configure logging
logger = logging.getLogger(__name__)

class ExcelToJsonView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file', None)

        if not file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        # Validate file extension
        if not file.name.endswith('.xlsx'):
            return Response({"error": "Invalid file format. Please upload an .xlsx file."},
                            status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Read the Excel file
            df = pd.read_excel(file, engine='openpyxl')

            if df.empty:
                return Response({"error": "The uploaded file is empty."}, status=status.HTTP_400_BAD_REQUEST)

            # Convert to JSON
            json_data = df.to_dict(orient="records")

            # Log success
            logger.info("Excel file successfully converted to JSON")

            # Return JSON response
            return Response(json_data, status=status.HTTP_200_OK)

        except ValueError as ve:
            logger.error(f"ValueError: {str(ve)}")
            return Response({"error": f"Value error in file: {str(ve)}"}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return Response({"error": "An internal server error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
