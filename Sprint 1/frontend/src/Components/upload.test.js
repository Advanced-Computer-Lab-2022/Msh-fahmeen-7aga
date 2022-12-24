import { FormData } from 'form-data';
import fetchMock from 'jest-fetch-mock';

test('uploading a PDF file', async () => {
  fetchMock.resetMocks();

  const file = new File(['test'], 'test.pdf');
  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('courseId', '12345');

  const response = await fetch('/upload/12345', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  expect(fetchMock.mock.calls[0][0]).toEqual('/upload/12345');
  expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
  expect(fetchMock.mock.calls[0][1].body).toEqual(formData);
  expect(data.message).toEqual('PDF file added successfully');
});
