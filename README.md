**Group 10 Activity: Implementing Web Storage Mechanisms in an E-Commerce Site**  
*Objective:* Apply knowledge of Cookies, Local Storage, and Session Storage to build a secure and functional e-commerce demo.  

---

### **Task 1: User Authentication with Cookies**   

**Questions:**  
- Why are `HttpOnly` and `Secure` flags important for cookies?

**Answers:**

  - HttpOnly prevents JavaScript from accessing the cookie, reducing the risk of XSS (Cross-Site Scripting) attacks.
  - Secure ensures that the cookie is only sent over HTTPS, preventing transmission over unencrypted connections, which helps prevent man-in-the-middle attacks.
  - Use of secure flag means that attackers using packet sniffing tools won’t be able to intercept Secure cookies on HTTPS connections. 
  - HttpOnly prevents client-side access to cookies, reducing XSS risks, while Secure ensures cookies are sent only over HTTPS. Together, they enhance session security and user privacy.
  - The HttpOnly and Secure flags are essential for enhancing security when handling cookies in web applications 
 

- How do session cookies differ from persistent cookies in this context?

  - Session cookies are temporary and expire when the browser is closed. They are stored in memory rather than on disk.
  - Persistent cookies have an expiration date and remain stored on the user's device even after closing the browser, enabling long-term authentication and preferences retention.
  - Session cookies have a lower risk of theft as they disappear on browser close, while persistent cookies can be stolen if improperly secured.
  - Session cookies are best for authentication, while persistent cookies should not store authentication data.
  - Session cookies exist only during a browsing session and are ideal for temporary data like login states. while Persistent cookies remain on the device after the session ends, enabling long-term tracking and preference storage.
  - Session cookies are preferred for security-sensitive applications while persistent cookies should never store sensitive authentication data, as they can be accessed even after the browser is closed
---

### **Task 2: Theme Preferences with Local Storage**  


**Questions:**  
- What happens if local storage exceeds its size limit? How would you handle this?

**Answers**

  - Browsers enforce a storage limit (typically 5-10MB per domain). If exceeded, setItem will fail, throwing a QuotaExceededError.
  - Handling:
     Use try...catch to catch errors when saving data.

     Optimize storage by compressing data or removing old/unused entries.

     Warn users if storage is near its limit.

  - Clear Unused or Old Data
   Manually delete old entries (e.g., using timestamps).
   Use Least Recently Used (LRU) strategy to remove the oldest data first.

  -Store only essential data by avoiding redundant or excessive information to prevent hitting the limits.
   
---

### **Task 3: Session-Specific Shopping Cart**  

**Questions:**  
- Why is session storage suitable for this use case?

**Answers**
 
  - This ensures that cart data is temporary and prevents stale data from being stored permanently when it’s no longer needed.

   - Session Storage is ideal because it persists only as long as the browser session is open, meaning the shopping cart resets when the browser is closed.
   - The cart resets when the browser is closed, which is useful for temporary selections.
  - Prevents unnecessary data buildup, ensuring the cart remains relevant only during the active session.
- Since session storage data is cleared when the browser is closed, it reduces the risk of unauthorized access to cart information, especially on shared or public computers.

### **Task 4: Security Implementation**  


### **Task 5: Reflection and Comparison**  
1. Fill out a comparison table based on the document:  

| Criteria          | Cookies          | Local Storage    | Session Storage  |  
|-------------------|------------------|------------------|------------------|  
| Storage Limit     | 4KB              | 5-10MB           | 5-10MB           |  
| Data Persistence  | Configurable     | Permanent        | Session-only     |  
| Server Accessibility | Yes            | No               | No               |  

2. **Discussion Questions:**  
   - When would you use cookies over local storage?

   **Answers**

     - Use cookies for data that needs to be sent to the server automatically with every request, such as authentication tokens.

      - Use local storage for client-side data that doesn’t need to be sent with every request, like UI preferences.
    - Use cookies for data that requires expiration or secure flags, such as session identifiers or sensitive information, ensuring better control over its lifespan and security.


  - What are the risks of storing passwords in session storage?
     
     - Session storage is accessible via JavaScript, making it vulnerable to XSS attacks.
     
     - Data is not encrypted by default, so it can be exposed if the site has security vulnerabilities.
     
     - Session storage is cleared when the browser is closed, which may lead to unexpected logout behavior for users who expect persistent login.
  


