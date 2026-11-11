const CUSTOMERS = [
    { name: 'Ravi Kumar', email: 'ravi.kumar@example.com', phone: '9876543210', address: '12 MG Road, Bengaluru, Karnataka' },
    { name: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '9823456712', address: '45 Park Street, Kolkata, West Bengal' },
    { name: 'Amit Verma', email: 'amit.verma@example.com', phone: '9765432109', address: '7 Civil Lines, Jaipur, Rajasthan' },
    { name: 'Sneha Reddy', email: 'sneha.reddy@example.com', phone: '9654321087', address: '23 Jubilee Hills, Hyderabad, Telangana' },
    { name: 'Vikram Singh', email: 'vikram.singh@example.com', phone: '9543210876', address: '9 Sector 17, Chandigarh' },
    { name: 'Anjali Nair', email: 'anjali.nair@example.com', phone: '9432108765', address: '56 Marine Drive, Kochi, Kerala' },
    { name: 'Karthik Iyer', email: 'karthik.iyer@example.com', phone: '9321087654', address: '3 Anna Nagar, Chennai, Tamil Nadu' },
    { name: 'Neha Gupta', email: 'neha.gupta@example.com', phone: '9210876543', address: '18 Indirapuram, Ghaziabad, UP' },
    { name: 'Rahul Deshmukh', email: 'rahul.deshmukh@example.com', phone: '9109876541', address: '27 FC Road, Pune, Maharashtra' },
    { name: 'Pooja Mehta', email: 'pooja.mehta@example.com', phone: '9998876541', address: '61 SG Highway, Ahmedabad, Gujarat' },
];
const SERVICE_TYPES = ['Installation', 'Repair', 'Maintenance', 'Inspection', 'Other'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const TITLES = {
    Installation: ['New AC installation', 'Water purifier installation', 'Solar panel setup'],
    Repair: ['Washing machine not spinning', 'Refrigerator cooling issue', 'Geyser not heating'],
    Maintenance: ['Quarterly AC servicing', 'Annual generator maintenance', 'Routine inverter checkup'],
    Inspection: ['Pre-purchase appliance inspection', 'Electrical wiring safety check', 'Gas pipeline inspection'],
    Other: ['Appliance relocation', 'Spare part replacement request', 'General consultation'],
};
function seededRandom(seed) {
    let value = seed;
    return () => {
        value = (value * 9301 + 49297) % 233280;
        return value / 233280;
    };
}
const random = seededRandom(42);
function pick(arr) {
    return arr[Math.floor(random() * arr.length)];
}
function buildTimeline(createdAt, status, updatedAt) {
    const timeline = [
        {
            id: `${createdAt}-created`,
            type: 'created',
            description: 'Service request created by customer',
            timestamp: createdAt,
        },
    ];
    if (status !== 'New') {
        timeline.push({
            id: `${createdAt}-updated`,
            type: 'status_changed',
            description: `Status changed from New to ${status}`,
            timestamp: updatedAt,
            fromStatus: 'New',
            toStatus: status,
        });
    }
    return timeline;
}
function daysAgo(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
}
function monthsAgo(months, dayOfMonth) {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    date.setDate(dayOfMonth);
    return date;
}
const STATUS_POOL = [
    'New',
    'Under Review',
    'Approved',
    'In Progress',
    'In Progress',
    'Pending',
    'Completed',
    'Completed',
    'Completed',
    'Cancelled',
    'Rejected',
];
export function generateMockServiceRequests() {
    const requests = [];
    let seq = 1;
    for (let m = 5; m >= 0; m -= 1) {
        const countThisMonth = 4 + Math.floor(random() * 4);
        for (let i = 0; i < countThisMonth; i += 1) {
            const customer = pick(CUSTOMERS);
            const serviceType = pick(SERVICE_TYPES);
            const priority = pick(PRIORITIES);
            const status = m === 0
                ? pick(['New', 'Under Review', 'Approved', 'In Progress', 'Pending'])
                : pick(STATUS_POOL);
            const createdDate = monthsAgo(m, 2 + i * 4 + Math.floor(random() * 3));
            const updatedDate = new Date(createdDate.getTime() + (1 + Math.floor(random() * 5)) * 86400000);
            const createdAt = createdDate.toISOString();
            const updatedAt = updatedDate.toISOString();
            const id = `REQ-${String(seq).padStart(4, '0')}`;
            seq += 1;
            requests.push({
                id,
                customerName: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: customer.address,
                serviceType,
                title: pick(TITLES[serviceType]),
                description: `${pick(TITLES[serviceType])}. Customer reported the issue and requested prompt assistance from the service team.`,
                priority,
                requestDate: createdAt,
                attachments: [],
                status,
                createdAt,
                updatedAt,
                timeline: buildTimeline(createdAt, status, updatedAt),
            });
        }
    }
    requests.push({
        id: `REQ-${String(seq).padStart(4, '0')}`,
        customerName: 'Deepak Chawla',
        email: 'deepak.chawla@example.com',
        phone: '9887766554',
        address: '14 Rajouri Garden, New Delhi',
        serviceType: 'Repair',
        title: 'Microwave oven not turning on',
        description: 'Microwave oven stopped working suddenly, display panel is unresponsive and needs urgent repair.',
        priority: 'High',
        requestDate: daysAgo(1).toISOString(),
        attachments: [],
        status: 'New',
        createdAt: daysAgo(1).toISOString(),
        updatedAt: daysAgo(1).toISOString(),
        timeline: buildTimeline(daysAgo(1).toISOString(), 'New', daysAgo(1).toISOString()),
    });
    return requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
