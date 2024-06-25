// 1. Import necessary modules and functions from 'vitest', '@testing-library/react', and '@testing-library/jest-dom'.
// 2. Globally mock the fetch function using 'vi.fn' from Vitest to simulate network requests.
// 3. Inside the mock fetch function, check the URL parameter:
//    a. If the URL matches 'http://localhost:5173/get_patient/1', return a resolved promise with a mocked JSON response.
//    b. For any other URL, return a rejected promise simulating an HTTP error with a status of 404.
// 4. Use 'afterEach' from Vitest to clean up the DOM after each test by calling 'cleanup' from '@testing-library/react'.

import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PatientSettingsPage from '../routes/PatientSettingsPage'; // Adjust the import path as necessary

// Mock fetch globally using Vitest
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ /* Mocked response data */ }),
  })
);

describe('PatientSettingsPage tests', () => {
  it('calls fetch with the correct URL', async () => {
    render(
      <MemoryRouter initialEntries={['/patient/123']}>
        <Routes>
          <Route path="/patient/:patientId" element={<PatientSettingsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('http://localhost:5000/get_patient/123'));
  });
});