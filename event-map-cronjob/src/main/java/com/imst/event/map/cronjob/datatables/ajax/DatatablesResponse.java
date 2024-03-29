/*
 * [The "BSD licence"]
 * Copyright (c) 2012 Dandelion
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * 3. Neither the name of Dandelion nor the names of its contributors 
 * may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
package com.imst.event.map.cronjob.datatables.ajax;


import java.util.List;

/**
 * <p>
 * Wrapper object the response that must be sent back to Datatables to update
 * the table when server-side processing is enabled.
 * </p>
 * <p>
 * Since Datatables only support JSON at the moment, this bean must be converted
 * to JSON by the server.
 * </p>
 * 
 * @author Thibault Duchateau
 * @since 0.8.2
 */
public class DatatablesResponse<T> {

   private final List<T> data;
   private final Long recordsTotal;
   private final Long recordsFiltered;
   private final Integer draw;

   private DatatablesResponse(DataSet<T> dataSet, DatatablesCriterias criterias) {
      this.data = dataSet.getRows();
      this.recordsTotal = dataSet.getTotalRecords();
      this.recordsFiltered = dataSet.getTotalDisplayRecords();
      this.draw = criterias.getDraw();
   }

   public List<T> getData() {
      return data;
   }

   public Long getRecordsTotal() {
      return recordsTotal;
   }

   public Long getRecordsFiltered() {
      return recordsFiltered;
   }

   public Integer getDraw() {
      return draw;
   }

   public static <T> DatatablesResponse<T> build(DataSet<T> dataSet, DatatablesCriterias criterias) {
      return new DatatablesResponse<T>(dataSet, criterias);
   }
}
