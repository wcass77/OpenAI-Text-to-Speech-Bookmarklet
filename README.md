# OpenAI Text-to-Speech Bookmarklet

This bookmarklet allows you to convert selected text on a webpage to speech using the OpenAI API. It provides a convenient way to listen to text without leaving the current page.

## Features

- Convert selected text to speech using OpenAI's Text-to-Speech API
- Play the generated audio directly in the browser
- Display a loading spinner while the audio is being generated
- Provide play, pause, and stop controls for the audio playback

## Installation

1. Create a new bookmark in your web browser.
2. Edit the bookmark and replace the URL with the entire URL.js JavaScript code provided.
3. Replace `"YOUR_API_KEY"` in the URL.js file with your actual OpenAI API key.
4. Save the bookmark.

## Usage

1. Navigate to a webpage with text you want to convert to speech.
2. Select the desired text by highlighting it with your mouse.
3. Click on the bookmarklet you created.
4. Wait for the audio to be generated (a loading spinner will be displayed).
5. Once the audio is ready, it will start playing automatically.
6. Use the provided play, pause, and stop buttons to control the audio playback.

## Dependencies

- OpenAI API: The bookmarklet relies on the OpenAI API to generate the audio. Make sure you have a valid API key from OpenAI.

## Configuration

- `sModelId`: The ID of the Text-to-Speech model to be used. Default is set to "tts-1-hd".
- `sVoiceId`: The ID of the voice to be used for the speech. Default is set to "echo".
- You can customize these values according to your preferences and the available models and voices in the OpenAI API.

## Error Handling

- If an error occurs during the API request, an alert will be displayed with the error status.
- If no text is selected when the bookmarklet is clicked, an alert will be shown prompting the user to select some text.

## Limitations

- Some websites may block the execution of bookmarklets or external scripts. In such cases, the bookmarklet may not function properly.