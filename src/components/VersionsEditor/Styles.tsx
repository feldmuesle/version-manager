import { styled } from '@mui/material/styles';

const Wrapper = styled('div')`
  width: 736px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => theme.spacer.ms};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.ms};
  text-align: left;
`;

const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonGroup = styled('div')`
  display: flex;
  gap: ${({ theme }) => theme.spacer.xs};
`;
const VersionsSection = styled('div')`
  display: flex;
  gap: ${({ theme }) => theme.spacer.xs};
  flex-wrap: wrap;
  align-items: center;
`;

const EditSection = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacer.sm};
  margin-bottom: ${({ theme }) => theme.spacer.lg};
`;

const ErrorSection = styled('div')`
  color: ${({ theme }) => theme.palette.text.error};
`;

const Heading = styled('h3')(({ theme }) => {
  return {
    ...theme.typography.pageTitle,
    color: theme.palette.text.primary,
    fontFamily: `'Quicksand', sans-serif`,
    margin: 0,
  };
});

const SubHeading = styled('span')(({ theme }) => {
  return {
    ...theme.typography.sectionTitle,
    color: theme.palette.secondary.main,
    fontFamily: `'Quicksand', sans-serif`,
  };
});

export const Styled = {
  Wrapper,
  ButtonGroup,
  Header,
  Heading,
  SubHeading,
  VersionsSection,
  EditSection,
  ErrorSection,
};
