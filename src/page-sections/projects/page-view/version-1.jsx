import Grid from '@mui/material/Grid2'; // CUSTOM COMPONENTS

import StatusFilter from '../StatusFilter';
import SearchFilter from '../SearchFilter';
import ProjectForm from '../project-form';
import ProjectCard1 from '../project-card-1';

import useProjects from '../useProjects';

export default function ProjectVersionOnePageView() {
  const {
    filters,
    openModal,
    filteredProjects,
    handleChangeFilter,
    handleCloseModal,
    handleOpenModal
  } = useProjects();

  console.log(filteredProjects); // ✅ Aman digunakan di browser

  return (
    <div className="pt-2 pb-4">
      {/* PROJECT FILTER BY STATUS */}
      <StatusFilter
        value={filters.status}
        handleChange={(value) => handleChangeFilter('status', value)}
      />

      {/* SEARCH INPUT AND CREATE BUTTON */}
      <SearchFilter
        handleOpenModal={handleOpenModal}
        handleChange={(value) => handleChangeFilter('searchValue', value)}
      />

      {/* PROJECT CREATION MODAL */}
      <ProjectForm open={openModal} handleClose={handleCloseModal} />

      {/* PROJECT CARDS */}
      <Grid container spacing={3}>
        {filteredProjects.map((project) => (
          <Grid
            key={project.id}
            xs={12}
            sm={6}
            lg={4}
          >
            <ProjectCard1 project={project} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
