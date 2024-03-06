// This script tests the integration of the OpenAI library in our project.
// It attempts to create an instance of OpenAI with a specified API key and verifies if the instance is successfully created.
// If the test passes, it logs a success message; otherwise, it logs an error message containing details of the failure.

// Custom assertion function to compare actual and expected values
function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(`${message}: Expected ${expected}, but got ${actual}`);
    }
}
// Import necessary modules
const { OpenAI } = require('openai');

// Test function to check OpenAI library integration
function testOpenAIIntegration() {
    try {
        console.log('Initializing OpenAI integration test...');

        // Act: Try to create an instance of OpenAI
        const openai = new OpenAI({ apiKey: 'OpenAI_API_Key_Here' });

        // Assert: Check if openai is an instance of OpenAI
        console.log('Asserting OpenAI integration...');
        assertEqual(typeof openai, 'object', 'OpenAI type');
        assertEqual(openai instanceof OpenAI, true, 'OpenAI instance');

        console.log('OpenAI library integration test passed successfully.');
    } catch (error) {
        // Check if the error code indicates an invalid API key
        if (error.code === 'InvalidApiKey') {
            console.error('OpenAI library integration test failed: Invalid API key.');
        } else {
            console.error('OpenAI library integration test failed:', error.message);
        }
    }
}
// Call the test function
testOpenAIIntegration();
