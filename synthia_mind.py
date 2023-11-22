import speech_recognition as sr
from gtts import gTTS
import os
import webbrowser

def listen():
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("Listening...")
        recognizer.pause_threshold = 1
        audio = recognizer.listen(source)

    try:
        print("Recognizing...")
        query = recognizer.recognize_google(audio, language='en-in')
        print(f"User: {query}\n")
        return query.lower()

    except sr.UnknownValueError:
        print("Sorry, I couldn't understand what you said.")
        return ""

def speak(response):
    tts = gTTS(text=response, lang='en')
    tts.save("response.mp3")
    os.system("mpg321 response.mp3")

def search_web(query):
    webbrowser.open(f"https://www.google.com/search?q={query}")

def main():
    print("SynthiaMind at your service!")
    while True:
        user_input = listen()
        if user_input == "exit":
            print("Goodbye!")
            break

        if user_input:
            search_web(user_input)
            response = f"I found some results for '{user_input}'."
            speak(response)

if __name__ == "__main__":
    main()
