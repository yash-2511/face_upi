import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

// Web-specific setup
if (Platform.OS === 'web') {
  // Ensure global objects exist
  if (typeof window !== 'undefined') {
    // Polyfill Worker
    if (!window.Worker) {
      window.Worker = class {
        constructor() {
          console.warn('Worker API not available - using fallback');
        }
        postMessage() {}
        terminate() {}
      } as any;
    }

    // Polyfill MessageChannel
    if (!window.MessageChannel) {
      window.MessageChannel = class {
        port1: any = {};
        port2: any = {};
        constructor() {
          console.warn('MessageChannel API not available - using fallback');
        }
      } as any;
    }
  }
}

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Signal that the framework is ready
      window.frameworkReady?.();
    }
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}