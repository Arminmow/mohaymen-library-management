# Library Management Task App

[Check it out](https://mohaymen-library-management.netlify.app/users)

## Overview & Purpose
This project is a simple Angular application for managing users and books.  
You can add users, assign books to each user, and display the relationship between users and their books.  
The main purpose of this project is to practice Angular concepts such as forms, components, services, state management, and routing.

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)  
- Angular CLI  

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Arminmow/mohaymen-library-management
   cd mohaymen-library-management

2. Install dependencies:
   ```bash
   npm install

3. Run the application:
   ```bash
   ng serve

Then open your browser at:
http://localhost:4200

---

## 🏛️ Project Architecture

- **Modules-Based Folder Structure**:  
  The application follows a **modules-based structure**.  
  Each module (e.g., `UsersModule`, `BooksModule`) contains its own components, services, and routing configuration.  
  Shared functionality (components, directives, pipes) is placed inside a `SharedModule`.

- **Lazy Loading**:  
  Modules are loaded lazily via routing to improve performance and scalability.

- **Shared Module**:  
  Common components, directives, and pipes used across multiple modules are centralized here.

- **Services & State Management**:  
  Angular services handle module-level logic, and **NgRx ComponentStore** is used for reactive state management within each module.  
  RxJS streams manage reactive data flow efficiently and allow dynamic updates.

---

## ✨ Implemented Features (Technical Details)

### 1. NgRx ComponentStore
- The app uses **singleton ComponentStores** (`providedIn: 'root'`) so that **all modules can access and share state**.  
- Each store (e.g., `UsersStore`, `BooksStore`) manages a specific domain, but any module can inject and use it.  
- State updates are handled via **updater methods**, which automatically notify all subscribed components across modules.  
- **Selectors** provide slices of state for components to subscribe to efficiently.  
- RxJS operators (like `map`, `filter`, `tap`) are used inside the store for reactive transformations, filtering, and deriving state.  
- This design ensures **centralized reactive state management** without a full global NgRx setup, while keeping stores modular and testable.


### 2. Dynamic Components & Generic Modal
- The app uses a **generic modal component** as a reusable container.  
- The **content inside the modal is loaded dynamically at runtime**, depending on the `contextUser` or the operation being performed.  
- Angular’s `ViewContainerRef` and `ComponentFactoryResolver` are used to instantiate the component dynamically inside the modal.  
- The modal **is not always rendered**; it appears only when needed, and its content is injected dynamically, keeping the UI modular and flexible.  
- Example use-case: editing a user or viewing the user’s book list in a modal without creating separate components for each modal variation.


### 3. BaseFormComponent
- A **BaseFormComponent** abstract class is created to centralize form logic.  
- It provides a method for generating **error messages** dynamically based on the validation state of form controls.  
- Individual forms (like `AddUserForm` or `AddBookForm`) **extend this base class**, which avoids repeating validation logic in every form component.  
- This ensures consistency in form handling and reduces boilerplate code.


### 4. Reactive Data Flow
- The application uses **RxJS streams** to propagate state changes from ComponentStores to components.  
- Components subscribe to state selectors, and any change in the store automatically updates the UI.  
- Derived data (like filtering books by user) is handled reactively using RxJS operators like `map`, `combineLatest`, and `filter`.  
- This approach ensures that **all components remain synchronized with state** without manual change detection or imperative DOM updates.

---

## 🧪 Running Tests

The project includes both **unit tests** and **integration tests**.

### 1. Unit Tests
- Written with **Jasmine** and run with **Karma**.  
- Test individual components, services, and stores in isolation.  
- Commands:
```bash
# Run all unit tests
ng test
```

### 1. Integration Tests
- Written with Cypress to test user flows across components and modules  
- Examples: adding a user, linking books to a user, opening the dynamic modal, etc
- Commands:
```bash
# Open Cypress interactive test runner
npx cypress open

# Run all Cypress tests headlessly
npx cypress run
```

Note: Cypress tests verify that the modules, ComponentStores, and dynamic components work together correctly in realistic scenarios







