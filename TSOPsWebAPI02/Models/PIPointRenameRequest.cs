using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TSOPsWebAPI02.Models
{
    public class PIPointRenameRequest
    {
        public string OldName { get; set; }
        public string NewName { get; set; }
    }
}