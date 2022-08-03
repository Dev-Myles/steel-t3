export interface IBaseTemplate {
  sampleTextProp: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTextProp }) => {
  return <div className="h-screen">{sampleTextProp}</div>;
};

export default BaseTemplate;
