interface BreadcrumbProps {
  titulo: string;
}

const Breandcrumb = ({ titulo }: BreadcrumbProps) => {
  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2">{titulo}</h1>
    </div>
  );
};

export default Breandcrumb;
