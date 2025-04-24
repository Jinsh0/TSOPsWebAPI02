using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OSIsoft.AF.PI;
using OSIsoft.AF;
using TSOPsWebAPI02.Models;

namespace TSOPsWebAPI02.Controllers
{
    [RoutePrefix("api/tsops")]
    public class TSOPsController : ApiController
    {
        private readonly PIServer _piServer;

        public TSOPsController()
        {
            // Set Application Identity BEFORE creating any server connection
            PISystems _piSystems = new PISystems();
            _piSystems.SetApplicationIdentity("3509D21C-C73C-4246-BEE2-7F39D741DF2B");

            //PIServers piServers = new PIServers();
            _piServer = PIServer.FindPIServer("Gary-VM111");
            _piServer.Connect();
        }

        //Action 0: Test and confirm connection, good to be done before any other Actions
        [HttpGet]
        [Route("server-info")]
        public IHttpActionResult GetServerInfo()
        {
            try
            {
                var connInfo = _piServer.ConnectionInfo;

                return Ok(new
                {
                    ServerName = _piServer.Name,
                    UniqueID = _piServer.UniqueID,
                    Host = connInfo.Host,
                    Port = connInfo.Port,
                    ServerVersion = _piServer.ServerVersion,
                    CurrentTime = _piServer.ServerTime,
                    TimeZone = _piServer.ServerTimeZone
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }


        // Action 1: Read descriptor from a PI Point
        [HttpGet]
        [Route("read/{tagName}")]
        public IHttpActionResult ReadDescriptor(string tagName)
        {
            try
            {
                //System.Diagnostics.Debug.WriteLine($"ReadDescriptor requested for tag: {tagName}");

                PIPoint myPIPoint = PIPoint.FindPIPoint(_piServer, tagName);
                
                // Load the descriptor attribute before reading it
                myPIPoint.LoadAttributes(PICommonPointAttributes.Descriptor);

                string descriptor = myPIPoint.GetAttribute(PICommonPointAttributes.Descriptor).ToString();
                //string descriptor = (string)myPIPoint.GetAttribute(PICommonPointAttributes.Descriptor);

                return Ok(new
                {
                    Status = "Good",
                    Value = descriptor
                });
            }
            catch (Exception ex)
            {
                //System.Diagnostics.Debug.WriteLine($"Error reading PI Point: {ex.Message}");
                return BadRequest($"Error: {ex.Message}");
            }
        }

        // Action 2: Rename a PI Point
        [HttpPost]
        [Route("rename")]
        public IHttpActionResult RenamePoint([FromBody] PIPointRenameRequest request)
        {
            try
            {
                PIPoint myPIPoint = PIPoint.FindPIPoint(_piServer, request.OldName);
                myPIPoint.Name = request.NewName;
                myPIPoint.SaveAttributes();

                return Ok(new
                {
                    Status = "Good",
                    Value = myPIPoint.Name
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
