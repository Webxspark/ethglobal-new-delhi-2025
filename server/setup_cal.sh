#!/bin/bash

# Cal.com API Setup Script
echo "🚀 Setting up Cal.com API for NoForma"
echo "======================================"

# Check if .env file exists
if [ -f .env ]; then
    echo "📄 Found existing .env file"
else
    echo "📝 Creating new .env file"
    touch .env
fi

echo ""
echo "📋 You need to configure these Cal.com settings:"
echo ""
echo "1. Get your Cal.com API Key:"
echo "   → Visit: https://app.cal.com/settings/developer/api-keys"
echo "   → Create a new API key"
echo "   → Copy the generated key"
echo ""

echo "2. Find your Event Type ID:"
echo "   → Visit: https://app.cal.com/event-types"
echo "   → Click on your event type"
echo "   → Copy the ID from the URL (numbers after /event-types/)"
echo ""

echo "3. Set your environment variables:"
echo "   Add these lines to your .env file or export them:"
echo ""
echo "   export CAL_API_KEY=\"your_api_key_here\""
echo "   export CAL_EVENT_ID=\"your_event_type_id_here\""
echo ""

# Offer to help set them up interactively
read -p "Would you like to set them up now? (y/n): " setup_now

if [ "$setup_now" = "y" ] || [ "$setup_now" = "Y" ]; then
    echo ""
    read -p "Enter your Cal.com API Key: " cal_api_key
    read -p "Enter your Cal.com Event Type ID: " cal_event_id
    
    # Add to .env file
    echo "CAL_API_KEY=$cal_api_key" >> .env
    echo "CAL_EVENT_ID=$cal_event_id" >> .env
    
    echo ""
    echo "✅ Environment variables added to .env file!"
    echo ""
    echo "🔄 Now restart your Flask server:"
    echo "   python app.py"
    echo ""
else
    echo ""
    echo "📝 Manual setup:"
    echo "   Add these to your .env file:"
    echo "   CAL_API_KEY=your_actual_key_here"
    echo "   CAL_EVENT_ID=your_actual_event_id_here"
    echo ""
    echo "   Or export them in your terminal:"
    echo "   export CAL_API_KEY=\"your_key\""
    echo "   export CAL_EVENT_ID=\"your_event_id\""
fi

echo ""
echo "🧪 To test your setup:"
echo "   curl http://localhost:5000/free-slots"
echo ""
echo "💡 The API will now provide helpful error messages if keys are missing!"