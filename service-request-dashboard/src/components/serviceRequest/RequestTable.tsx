import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '../common/Typography';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from 'react-router-dom';
import type { ServiceRequest } from '../../types/serviceRequest.types';
import StatusChip from '../common/StatusChip';
import PriorityChip from '../common/PriorityChip';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/dateUtils';

interface RequestTableProps {
  requests: ServiceRequest[];
  sortDirection: 'asc' | 'desc';
  onSortChange: (direction: 'asc' | 'desc') => void;
  onDelete: (request: ServiceRequest) => void;
}

export default function RequestTable({ requests, sortDirection, onSortChange, onDelete }: RequestTableProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (requests.length === 0) {
    return (
      <EmptyState
        title="No service requests found"
        description="Try adjusting your search or filters, or create a new service request."
      />
    );
  }

  if (isMobile) {
    return (
      <Stack spacing={1.5}>
        {requests.map((request) => (
          <Card key={request.id} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {request.id}
                  </Typography>
                  <Typography variant="body2">{request.customerName}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {request.serviceType} • {formatDate(request.requestDate)}
                  </Typography>
                </Box>
                <StatusChip status={request.status} />
              </Box>
              <Box sx={{ mt: 1.5 }}>
                <PriorityChip priority={request.priority} />
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                <IconButton size="small" onClick={() => navigate(`/requests/${request.id}`)}>
                  <VisibilityOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => navigate(`/requests/${request.id}/edit`)}>
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => onDelete(request)}>
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <TableContainer>
      <Table
        size="small"
        sx={{
          tableLayout: 'fixed',
          width: '100%',
          '& .MuiTableCell-root': { px: 1, overflow: 'hidden' },
        }}
      >
        <colgroup>
          <col style={{ width: 92 }} />
          <col style={{ width: 128 }} />
          <col />
          <col style={{ width: 116 }} />
          <col style={{ width: 108 }} />
          <col style={{ width: 80 }} />
          <col style={{ width: 120 }} />
          <col style={{ width: 112 }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Service Type</TableCell>
            <TableCell sortDirection={sortDirection}>
              <TableSortLabel
                active
                direction={sortDirection}
                onClick={() => onSortChange(sortDirection === 'asc' ? 'desc' : 'asc')}
              >
                Request Date
              </TableSortLabel>
            </TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id} hover>
              <TableCell sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{request.id}</TableCell>
              <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{request.customerName}</TableCell>
              <TableCell sx={{ whiteSpace: 'normal', overflowWrap: 'anywhere' }}>{request.email}</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>{request.serviceType}</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>{formatDate(request.requestDate)}</TableCell>
              <TableCell>
                <PriorityChip priority={request.priority} />
              </TableCell>
              <TableCell>
                <StatusChip status={request.status} />
              </TableCell>
              <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
                  <Tooltip title="View">
                    <IconButton size="small" aria-label="View" onClick={() => navigate(`/requests/${request.id}`)}>
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" aria-label="Edit" onClick={() => navigate(`/requests/${request.id}/edit`)}>
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" aria-label="Delete" onClick={() => onDelete(request)}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
