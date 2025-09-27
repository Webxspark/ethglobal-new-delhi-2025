// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SimplifiedNoForma
 * @dev A simplified contract for managing knowledge base, customers, and projects
 */
contract SimplifiedNoForma {
    
    // Structs
    struct KnowledgeBase {
        uint256 id;
        string title;
        string group;
        string content;
        bool exists;
    }
    
    struct Customer {
        uint256 id;
        string name;
        string email;
        string phone;
        bool exists;
    }
    
    struct Project {
        uint256 id;
        string name;
        string customer;
        string status;
        string details;
        bool exists;
    }
    
    // Storage mappings
    mapping(uint256 => KnowledgeBase) public knowledgeBase;
    mapping(uint256 => Customer) public customers;
    mapping(uint256 => Project) public projects;
    
    // Arrays to track all IDs
    uint256[] public knowledgeBaseIds;
    uint256[] public customerIds;
    uint256[] public projectIds;
    
    // Events
    event KnowledgeBaseCreated(uint256 indexed id, string title, string group);
    event KnowledgeBaseUpdated(uint256 indexed id, string title, string group);
    event KnowledgeBaseDeleted(uint256 indexed id);
    
    event CustomerCreated(uint256 indexed id, string name, string email, string phone);
    event CustomerUpdated(uint256 indexed id, string name, string email, string phone);
    event CustomerDeleted(uint256 indexed id);
    
    event ProjectCreated(uint256 indexed id, string name, string customer, string status);
    event ProjectUpdated(uint256 indexed id, string name, string customer, string status);
    event ProjectDeleted(uint256 indexed id);
    
    // Modifiers
    modifier knowledgeBaseExists(uint256 _id) {
        require(knowledgeBase[_id].exists, "Knowledge base entry does not exist");
        _;
    }
    
    modifier customerExists(uint256 _id) {
        require(customers[_id].exists, "Customer does not exist");
        _;
    }
    
    modifier projectExists(uint256 _id) {
        require(projects[_id].exists, "Project does not exist");
        _;
    }
    
    // Knowledge Base CRUD Operations
    
    /**
     * @dev Create a new knowledge base entry
     */
    function createKnowledgeBase(
        string memory _title,
        string memory _group,
        string memory _content
    ) external returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_content).length > 0, "Content cannot be empty");
        
        uint256 id = block.timestamp;
        
        knowledgeBase[id] = KnowledgeBase({
            id: id,
            title: _title,
            group: _group,
            content: _content,
            exists: true
        });
        
        knowledgeBaseIds.push(id);
        
        emit KnowledgeBaseCreated(id, _title, _group);
        return id;
    }
    
    /**
     * @dev Update an existing knowledge base entry
     */
    function updateKnowledgeBase(
        uint256 _id,
        string memory _title,
        string memory _group,
        string memory _content
    ) external knowledgeBaseExists(_id) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_content).length > 0, "Content cannot be empty");
        
        knowledgeBase[_id].title = _title;
        knowledgeBase[_id].group = _group;
        knowledgeBase[_id].content = _content;
        
        emit KnowledgeBaseUpdated(_id, _title, _group);
    }
    
    /**
     * @dev Delete a knowledge base entry
     */
    function deleteKnowledgeBase(uint256 _id) external knowledgeBaseExists(_id) {
        knowledgeBase[_id].exists = false;
        
        // Remove from array
        for (uint256 i = 0; i < knowledgeBaseIds.length; i++) {
            if (knowledgeBaseIds[i] == _id) {
                knowledgeBaseIds[i] = knowledgeBaseIds[knowledgeBaseIds.length - 1];
                knowledgeBaseIds.pop();
                break;
            }
        }
        
        emit KnowledgeBaseDeleted(_id);
    }
    
    /**
     * @dev Get a knowledge base entry by ID
     */
    function getKnowledgeBase(uint256 _id) external view knowledgeBaseExists(_id) returns (
        uint256 id,
        string memory title,
        string memory group,
        string memory content
    ) {
        KnowledgeBase memory kb = knowledgeBase[_id];
        return (kb.id, kb.title, kb.group, kb.content);
    }
    
    /**
     * @dev Get all knowledge base IDs
     */
    function getAllKnowledgeBaseIds() external view returns (uint256[] memory) {
        return knowledgeBaseIds;
    }
    
    /**
     * @dev Get all knowledge base entries
     */
    function getAllKnowledgeBase() external view returns (
        uint256[] memory ids,
        string[] memory titles,
        string[] memory groups,
        string[] memory contents
    ) {
        uint256 length = knowledgeBaseIds.length;
        ids = new uint256[](length);
        titles = new string[](length);
        groups = new string[](length);
        contents = new string[](length);
        
        for (uint256 i = 0; i < length; i++) {
            uint256 id = knowledgeBaseIds[i];
            KnowledgeBase memory kb = knowledgeBase[id];
            ids[i] = kb.id;
            titles[i] = kb.title;
            groups[i] = kb.group;
            contents[i] = kb.content;
        }
        
        return (ids, titles, groups, contents);
    }
    
    // Customer CRUD Operations
    
    /**
     * @dev Create a new customer
     */
    function createCustomer(
        string memory _name,
        string memory _email,
        string memory _phone
    ) external returns (uint256) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        
        uint256 id = block.timestamp;
        
        customers[id] = Customer({
            id: id,
            name: _name,
            email: _email,
            phone: _phone,
            exists: true
        });
        
        customerIds.push(id);
        
        emit CustomerCreated(id, _name, _email, _phone);
        return id;
    }
    
    /**
     * @dev Update an existing customer
     */
    function updateCustomer(
        uint256 _id,
        string memory _name,
        string memory _email,
        string memory _phone
    ) external customerExists(_id) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        
        customers[_id].name = _name;
        customers[_id].email = _email;
        customers[_id].phone = _phone;
        
        emit CustomerUpdated(_id, _name, _email, _phone);
    }
    
    /**
     * @dev Delete a customer
     */
    function deleteCustomer(uint256 _id) external customerExists(_id) {
        customers[_id].exists = false;
        
        // Remove from array
        for (uint256 i = 0; i < customerIds.length; i++) {
            if (customerIds[i] == _id) {
                customerIds[i] = customerIds[customerIds.length - 1];
                customerIds.pop();
                break;
            }
        }
        
        emit CustomerDeleted(_id);
    }
    
    /**
     * @dev Get a customer by ID
     */
    function getCustomer(uint256 _id) external view customerExists(_id) returns (
        uint256 id,
        string memory name,
        string memory email,
        string memory phone
    ) {
        Customer memory customer = customers[_id];
        return (customer.id, customer.name, customer.email, customer.phone);
    }
    
    /**
     * @dev Get all customer IDs
     */
    function getAllCustomerIds() external view returns (uint256[] memory) {
        return customerIds;
    }
    
    /**
     * @dev Get all customers
     */
    function getAllCustomers() external view returns (
        uint256[] memory ids,
        string[] memory names,
        string[] memory emails,
        string[] memory phones
    ) {
        uint256 length = customerIds.length;
        ids = new uint256[](length);
        names = new string[](length);
        emails = new string[](length);
        phones = new string[](length);
        
        for (uint256 i = 0; i < length; i++) {
            uint256 id = customerIds[i];
            Customer memory customer = customers[id];
            ids[i] = customer.id;
            names[i] = customer.name;
            emails[i] = customer.email;
            phones[i] = customer.phone;
        }
        
        return (ids, names, emails, phones);
    }
    
    // Project CRUD Operations
    
    /**
     * @dev Create a new project
     */
    function createProject(
        string memory _name,
        string memory _customer,
        string memory _status,
        string memory _details
    ) external returns (uint256) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_customer).length > 0, "Customer cannot be empty");
        
        uint256 id = block.timestamp;
        
        projects[id] = Project({
            id: id,
            name: _name,
            customer: _customer,
            status: _status,
            details: _details,
            exists: true
        });
        
        projectIds.push(id);
        
        emit ProjectCreated(id, _name, _customer, _status);
        return id;
    }
    
    /**
     * @dev Update an existing project
     */
    function updateProject(
        uint256 _id,
        string memory _name,
        string memory _customer,
        string memory _status,
        string memory _details
    ) external projectExists(_id) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_customer).length > 0, "Customer cannot be empty");
        
        projects[_id].name = _name;
        projects[_id].customer = _customer;
        projects[_id].status = _status;
        projects[_id].details = _details;
        
        emit ProjectUpdated(_id, _name, _customer, _status);
    }
    
    /**
     * @dev Delete a project
     */
    function deleteProject(uint256 _id) external projectExists(_id) {
        projects[_id].exists = false;
        
        // Remove from array
        for (uint256 i = 0; i < projectIds.length; i++) {
            if (projectIds[i] == _id) {
                projectIds[i] = projectIds[projectIds.length - 1];
                projectIds.pop();
                break;
            }
        }
        
        emit ProjectDeleted(_id);
    }
    
    /**
     * @dev Get a project by ID
     */
    function getProject(uint256 _id) external view projectExists(_id) returns (
        uint256 id,
        string memory name,
        string memory customer,
        string memory status,
        string memory details
    ) {
        Project memory project = projects[_id];
        return (project.id, project.name, project.customer, project.status, project.details);
    }
    
    /**
     * @dev Get all project IDs
     */
    function getAllProjectIds() external view returns (uint256[] memory) {
        return projectIds;
    }
    
    /**
     * @dev Get all projects with customer information
     */
    function getAllProjectsWithCustomerInformation() external view returns (
        uint256[] memory ids,
        string[] memory names,
        string[] memory customerNames,
        string[] memory statuses,
        string[] memory details
    ) {
        uint256 length = projectIds.length;
        ids = new uint256[](length);
        names = new string[](length);
        customerNames = new string[](length);
        statuses = new string[](length);
        details = new string[](length);
        
        for (uint256 i = 0; i < length; i++) {
            uint256 id = projectIds[i];
            Project memory project = projects[id];
            ids[i] = project.id;
            names[i] = project.name;
            customerNames[i] = project.customer;
            statuses[i] = project.status;
            details[i] = project.details;
        }
        
        return (ids, names, customerNames, statuses, details);
    }
    
    // Utility functions
    
    /**
     * @dev Get total counts
     */
    function getCounts() external view returns (
        uint256 knowledgeBaseCount,
        uint256 customerCount,
        uint256 projectCount
    ) {
        return (knowledgeBaseIds.length, customerIds.length, projectIds.length);
    }
}