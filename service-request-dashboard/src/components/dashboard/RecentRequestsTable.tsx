import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';
import type { RecentRequestSummary } from '../../types/dashboard.types';
import StatusChip from '../common/StatusChip';
import PriorityChip from '../common/PriorityChip';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/dateUtils';

interface RecentRequestsTableProps {
  requests: RecentRequestSummary[];
}

export default function RecentRequestsTable({ requests }: RecentRequestsTableProps) {
  const navigate = useNavigate();

  if (requests.length === 0) {
    return <EmptyState title="No recent requests" description="New service requests will appear here." />;
  }

  return (
    <TableContainer sx={{ overflowX: 'auto' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Service Type</TableCell>
            <TableCell>Request Date</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow
              key={request.id}
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(`/requests/${request.id}`)}
            >
              <TableCell sx={{ fontWeight: 600 }}>{request.id}</TableCell>
              <TableCell>{request.customerName}</TableCell>
              <TableCell>{request.serviceType}</TableCell>
              <TableCell>{formatDate(request.requestDate)}</TableCell>
              <TableCell>
                <PriorityChip priority={request.priority} />
              </TableCell>
              <TableCell>
                <StatusChip status={request.status} />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="View details">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/requests/${request.id}`);
                    }}
                  >
                    <VisibilityOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
