import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import '@testing-library/jest-dom'

global.fetch = vi.fn((url) =>
    url === 'http://localhost:5173/get_patient/1'
      ? Promise.resolve({
          json: () => Promise.resolve({ /* Mocked response data for this specific case */ }),
        })
      : Promise.resolve(Promise.reject((() => {
          const error = new Error('HTTP error!');
          error.status = 404;
          return error;
      })()))
);
afterEach(() => {
    cleanup();
});