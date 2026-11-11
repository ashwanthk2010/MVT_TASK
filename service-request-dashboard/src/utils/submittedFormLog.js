export function logSubmittedFormData(values, attachments, meta) {
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
