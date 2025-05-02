import React, { FC } from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Project } from '../pages/ProjectsPage';

interface Props {
  project: Project;
  handleUpdate: (id: string) => void;
  handleDelete: (project: Project) => void;
}

const ProjectItem: FC<Props> = ({ project, handleUpdate, handleDelete }) => {

  return (
    <TableRow key={project.id}>
      <TableCell>{project.ownerName}</TableCell>
      <TableCell>{project.repoName}</TableCell>
      <TableCell>
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          {project.url}
        </a>
      </TableCell>
      <TableCell>{project.stars}</TableCell>
      <TableCell>{project.forks}</TableCell>
      <TableCell>{project.issues}</TableCell>
      <TableCell>
        {new Date(project.repoCreatedAt).toUTCString()}
      </TableCell>
      <TableCell>
        <Tooltip title="Update project" placement="right">
          <IconButton
            onClick={() => handleUpdate(project.id)}
            size="small"
            color="primary"
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete project" placement="right">
          <IconButton
            onClick={() => handleDelete(project)}
            size="small"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default ProjectItem;
