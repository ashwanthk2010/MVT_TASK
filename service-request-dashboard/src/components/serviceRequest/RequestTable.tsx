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

const actionSx = (color: string, hoverBg: string) => ({
  color: 'text.secondary',
  borderRadius: 2,
  '&:hover': { color, bgcolor: hoverBg },
});

const VIEW_SX = actionSx('#0EA5E9', 'rgba(14,165,233,0.10)');
const EDIT_SX = actionSx('#4F46E5', 'rgba(79,70,229,0.10)');
const DELETE_SX = actionSx('#DC2626', 'rgba(220,38,38,0.10)');

interface RequestTableProps {
  requests: ServiceRequest[];
  sortDirection: 'asc' | 'desc';
  onSortChange: (direction: 'asc' | 'desc') => void;
  onDelete: (request: ServiceRequest) => void;
}

export default function RequestTable({ requests, sortDirection, onSortChange, onDelete }: RequestTableProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1.5 }}>
        <TableSortLabel
          active
          direction={sortDirection}
          onClick={() => onSortChange(sortDirection === 'asc' ? 'desc' : 'asc')}
          sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.secondary' }}
        >
          Request Date
        </TableSortLabel>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gap: 1.5,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
        }}
      >
        {requests.map((request) => (
          <Card key={request.id} variant="outlined" sx={{ boxShadow: 'none' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="subtitle2" fontWeight={700} color="primary.main">
                    {request.id}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {request.customerName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ overflowWrap: 'anywhere' }}>
                    {request.email}
                  </Typography>
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
                <IconButton size="small" sx={VIEW_SX} onClick={() => navigate(`/requests/${request.id}`)}>
                  <VisibilityOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={EDIT_SX} onClick={() => navigate(`/requests/${request.id}/edit`)}>
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={DELETE_SX} onClick={() => onDelete(request)}>
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      </Box>
    );
  }

  return (
    <TableContainer sx={{ overflowX: 'auto', borderRadius: 2.5, border: '1px solid', borderColor: 'divider' }}>
      <Table
        size="small"
        sx={{
          tableLayout: 'fixed',
          width: '100%',
          minWidth: 860,
          '& .MuiTableCell-root': { px: 1, overflow: 'hidden' },
          '& .MuiTableCell-root:first-of-type': { pl: 2 },
          '& .MuiTableCell-root:last-of-type': { pr: 1.5 },
        }}
      >
        <colgroup>
          <col style={{ width: 100 }} />
          <col style={{ width: 124 }} />
          <col />
          <col style={{ width: 108 }} />
          <col style={{ width: 106 }} />
          <col style={{ width: 98 }} />
          <col style={{ width: 126 }} />
          <col style={{ width: 108 }} />
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
              <TableCell sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: 'primary.main' }}>{request.id}</TableCell>
              <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', fontWeight: 500 }}>
                {request.customerName}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'normal', overflowWrap: 'anywhere', color: 'text.secondary' }}>
                {request.email}
              </TableCell>
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
                    <IconButton size="small" aria-label="View" sx={VIEW_SX} onClick={() => navigate(`/requests/${request.id}`)}>
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      aria-label="Edit"
                      sx={EDIT_SX}
                      onClick={() => navigate(`/requests/${request.id}/edit`)}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" aria-label="Delete" sx={DELETE_SX} onClick={() => onDelete(request)}>
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
