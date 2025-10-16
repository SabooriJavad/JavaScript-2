# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e3]:
    - link "Create" [ref=e4] [cursor=pointer]:
      - /url: /create
    - text: "|"
    - link "Edit" [ref=e5] [cursor=pointer]:
      - /url: /edit
    - text: "|"
    - link "Delete" [ref=e6] [cursor=pointer]:
      - /url: /delete
  - generic [ref=e8]:
    - heading "Create Event" [level=3] [ref=e9]
    - textbox "Create Event Create" [ref=e10]:
      - /placeholder: Title
    - textbox [ref=e11]
    - textbox "Description" [ref=e12]
    - button "Create" [ref=e13]
```