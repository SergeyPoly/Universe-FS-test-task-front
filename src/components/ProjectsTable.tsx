import React, { Dispatch, SetStateAction, FC } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box, Typography, TablePagination,
} from '@mui/material';
import { Project } from '../pages/ProjectsPage';
import ProjectItem from './ProjectItem';

interface Props {
  projects: Project[];
  handleUpdate: (id: string) => void;
  handleDelete: (project: Project) => void;
  totalCount: number;
  page: number;
  rowsPerPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
}

const ProjectsTable: FC<Props> = ({
                                    projects,
                                    handleUpdate,
                                    handleDelete,
                                    totalCount,
                                    page,
                                    rowsPerPage,
                                    setPage,
                                    setRowsPerPage,
                                  }) => {
  if (!projects.length) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">You don't have any projects yet</Typography>
        <Typography variant="body2" color="textSecondary">
          Start to add a new project from GitHub repository
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Owner</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Stars</TableCell>
            <TableCell>Forks</TableCell>
            <TableCell>Issues</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => <ProjectItem
            key={project.id}
            project={project}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete} />)}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0); // сброс на первую страницу
        }}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Box>
  );
};

export default ProjectsTable;
