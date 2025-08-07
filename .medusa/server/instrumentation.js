"use strict";
// Uncomment this file to enable instrumentation and observability using OpenTelemetry
// Refer to the docs for installation instructions: https://docs.medusajs.com/learn/debugging-and-testing/instrumentation
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
// import { registerOtel } from "@medusajs/medusa"
// // If using an exporter other than Zipkin, require it here.
// import { ZipkinExporter } from "@opentelemetry/exporter-zipkin"
// // If using an exporter other than Zipkin, initialize it here.
// const exporter = new ZipkinExporter({
//   serviceName: 'my-medusa-project',
// })
// export function register() {
//   registerOtel({
//     serviceName: 'medusajs',
//     // pass exporter
//     exporter,
//     instrument: {
//       http: true,
//       workflows: true,
//       query: true
//     },
//   })
// }
// Export an empty register function to prevent the module not found error
function register() {
    // Empty function to satisfy the instrumentation requirement
    console.log('Instrumentation disabled');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdHJ1bWVudGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vaW5zdHJ1bWVudGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzRkFBc0Y7QUFDdEYseUhBQXlIOztBQXlCekgsNEJBR0M7QUExQkQsa0RBQWtEO0FBQ2xELDhEQUE4RDtBQUM5RCxrRUFBa0U7QUFFbEUsaUVBQWlFO0FBQ2pFLHdDQUF3QztBQUN4QyxzQ0FBc0M7QUFDdEMsS0FBSztBQUVMLCtCQUErQjtBQUMvQixtQkFBbUI7QUFDbkIsK0JBQStCO0FBQy9CLHVCQUF1QjtBQUN2QixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQix5QkFBeUI7QUFDekIsb0JBQW9CO0FBQ3BCLFNBQVM7QUFDVCxPQUFPO0FBQ1AsSUFBSTtBQUVKLDBFQUEwRTtBQUMxRSxTQUFnQixRQUFRO0lBQ3RCLDREQUE0RDtJQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUE7QUFDekMsQ0FBQyJ9