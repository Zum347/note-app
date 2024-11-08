import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Note } from '../../types';

interface LayoutProps {
  notes: Note[];
}

const Layout = ({ notes }: LayoutProps) => {
  const { id } = useParams();

  const found = notes.find((n) => n.id == id);

  if (!found) return <Navigate to={'/'} replace />;

  return <Outlet context={found} />;
};

export default Layout;