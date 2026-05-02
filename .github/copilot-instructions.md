# Repo wide guidelines


These are repository-wide guidelines. Path‑scoped files in `.github/instructions/*.instructions.md` provide focused guidance for specific areas (frontend, API, database).  


## High level guidelines 

- Generate code in Python language unless otherwise specified.
- Create Dockerfiles for all services and applications.
- Use az acr build to build and push Docker images to Azure Container Registry. Use srinmantest as the registry name.  
- Always use CLI commands to interact with Azure resources. Avoid using the Azure Portal for resource management. Don't use ARM templates or Terraform for infrastructure provisioning.
  - If a resource provide doesn't have CLI support, use REST API calls to create or manage the resource.
- Use environmental variables to manage configuration settings and secrets. Avoid hardcoding sensitive information in code or configuration files.
- Use az account show command to prepopulate the subscription and tenant information in CLI commands. This ensures that all commands are executed in the correct context without needing to specify subscription or tenant parameters repeatedly.
- Follow best practices for security, such as using managed identities for authentication and authorization, and implementing
- When prompted with 'draw flow', create a flow diagram using Mermaid syntax to visually represent the architecture, data flow, or process flow of the system. This can help in understanding complex interactions and dependencies within the system.
- when prompted with 'draw seq', create a sequence diagram using Mermaid syntax to illustrate the interactions between different components or services over time. This can help in understanding the order of operations and the flow of data between components in a system.
- When prompted with 'draw arch', create an architecture diagram using Mermaid syntax to depict the overall structure of the system, including components, services, and their relationships. This can help in visualizing the high-level design and organization of the system.
- README.md files should include a clear description of the project, setup instructions, usage guidelines, and any relevant information for developers or users. They should be well-organized and easy to navigate, providing a comprehensive overview of the project and its functionality. It should also include step by step CLI commands to implement the functionality described in the README.
- Use inline bash EOF syntax to provide code snippets for CLI commands in README.md files. This allows for clear and concise presentation of commands, making it easier for developers to copy and execute them without formatting issues. For example:
- Use inline yaml EOF syntax for yaml with less than 150 lines in README.md files. This command should send the commant to the current kubectl context.  
- for larger yaml, create a k8s sub-directory and keep the files there with kubectl apply -f <file> commands in the README.