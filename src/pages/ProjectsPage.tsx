import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  CircularProgress,
} from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import { useNotification } from '../providers/NotificationProvider';
import { getErrorMessage } from '../utils/getErrorMessage';
import ConfirmDialog from '../components/ConfirmDialog';
import ProjectsTable from '../components/ProjectsTable';
import { useAuth } from '../providers/AuthProvider';

export interface Project {
  id: string;
  ownerName: string;
  repoName: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  repoCreatedAt: number;
}

const ProjectsPage: React.FC = () => {
  const { showNotification } = useNotification();
  const { logout } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [newRepoPath, setNewRepoPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/projects', {
        params: {
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      setProjects(res.data.projects);
      setTotalCount(res.data.total);
    } catch (err) {
      showNotification(getErrorMessage(err), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, rowsPerPage]);

  const handleAddProject = async () => {
    if (!newRepoPath.trim()) return;
    try {
      await axiosInstance.post('/projects', {
        repositoryPath: newRepoPath.trim(),
      });
      showNotification('Project successfully added', 'success');
      setNewRepoPath('');
      fetchProjects();
    } catch (err) {
      showNotification(getErrorMessage(err), 'error');
    }
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/projects/${projectToDelete.id}`);
      showNotification('Project successfully deleted', 'success');
      fetchProjects();
    } catch (error) {
      showNotification(getErrorMessage(error), 'error');
    } finally {
      setIsDeleting(false);
      setProjectToDelete(null);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await axiosInstance.patch(`/projects/${id}`);
      showNotification('Project successfully updated', 'success');
      fetchProjects();
    } catch (err) {
      showNotification(getErrorMessage(err), 'error');
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Projects
        </Typography>

        <Stack direction="row" spacing={2} mb={3}>
          <TextField
            label="GitHub Repo Path (e.g. facebook/react)"
            value={newRepoPath}
            onChange={(e) => setNewRepoPath(e.target.value)}
            fullWidth
          />
          <Button
            disabled={!newRepoPath.length}
            style={{ minWidth: '11rem' }}
            variant="contained"
            onClick={handleAddProject}
          >
            Add new project
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={logout}
          >
            Logout
          </Button>
        </Stack>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <ProjectsTable
            projects={projects}
            handleUpdate={handleUpdate}
            handleDelete={(project: Project) => setProjectToDelete(project)}
            totalCount={totalCount}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        )}

        <ConfirmDialog
          isOpen={!!projectToDelete}
          title="Confirm deletion"
          text={`Are you sure you want to delete ${projectToDelete?.repoName} project`}
          disabled={isDeleting}
          handleClose={() => setProjectToDelete(null)}
          handleConfirm={confirmDeleteProject}
        />
      </Box>
    </Container>
  );
};

export default ProjectsPage;
