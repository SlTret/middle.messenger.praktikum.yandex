declare module "*.hbs" {

  type Props = { [key: string]: string } 
  type TemplateFunction = (props: Props) => string

  const content: TemplateFunction;
  export default content;
}