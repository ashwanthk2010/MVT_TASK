import type { Attachment, ServiceRequestFormValues } from '../types/serviceRequest.types';

export function logSubmittedFormData(
  values: ServiceRequestFormValues,
  attachments: Attachment[],
  meta?: { id?: string },
): void {
  const submittedData = {
    ...(meta?.id ? { id: meta.id } : {}),
    customerName: values.customerName,
    email: values.email,
    phone: values.phone,
    serviceType: values.serviceType,
    title: values.title,
    description: values.description,
    priority: values.priority,
    requestDate: values.requestDate,
    address: values.address,
    attachments: attachments.map((file) => ({
      filename: file.name,
      size: file.size,
      type: file.type,
    })),
  };

  console.log('Submitted Form Data:', submittedData);
}
