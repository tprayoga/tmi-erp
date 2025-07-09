import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'; // CUSTOM COMPONENTS

import Link from '@/components/link';
import SectionTitle from '@/components/section-title'; // STYLED COMPONENT

import { StyledCard, StyledContainer } from './styles'; // CUSTOM DUMMY DATA

import { JOBS } from '../data';
export default function Section2() {
  return <StyledContainer maxWidth="lg">
      <div className="heading">
        <SectionTitle mb={3} centered title="Available Jobs" />
        <p>Join our dynamic team of professionals and shape the future of IT Industry.</p>
      </div>

      {
      /* JOB CARDS */
    }
      <Grid container spacing={3}>
        {JOBS.map(job => <Grid size={{
        lg: 4,
        sm: 6,
        xs: 12
      }} key={job.id}>
            <StyledCard>
              <h6 className="title">{job.title}</h6>

              <p className="description">{job.description}</p>

              <Stack mb={3} rowGap={1} columnGap={1} flexWrap="wrap" direction="row" alignItems="center">
                <Chip color="secondary" label={job.employmentType} />
                <Chip color="secondary" label={job.locationType} />
                <Chip color="secondary" label={job.salaryRange} />
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Button variant="outlined" LinkComponent={Link} href={`/career/${job.title}`}>
                  View Details
                </Button>

                <Button LinkComponent={Link} href="/career/apply">
                  Apply this job
                </Button>
              </Stack>
            </StyledCard>
          </Grid>)}
      </Grid>
    </StyledContainer>;
}